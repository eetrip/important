<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserRole;
use App\Models\Book;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;
class SearchController extends Controller
{
    public function searchBooks($search_str)
    {
        $books = Book::where('name', 'LIKE', "%{$search_str}%")->where('status',Config::get('constants.BOOK_STATUS.PUBLISHED'))->select('id', 'name', 'author', 'book_covers', 'book_type')->get();
        $shorts = [];
        $full = [];
        foreach ($books as $book) {
            if ($book->book_type == Config::get('constants.BOOK_TYPES.FULL')) {
                array_push($full, $book);
            } elseif ($book->book_type == Config::get('constants.BOOK_TYPES.SHORTS')) {
                array_push($shorts, $book);
            }
        }
        $all_books = (object) [];
        $all_books->shorts = $shorts;
        $all_books->full = $full;
        return $all_books;
    }
    public function searchAuthors($search_str)
    {
        $authors = User::has('books')->where('name', 'LIKE', "%{$search_str}%")->select('id', 'name', 'photo_url')->get();
        return $authors;
    }
    public function searchAll(Request $request)
    {
        $search_str = $request->key;
        $books = $this->searchBooks($search_str);
        $authors = $this->searchAuthors($search_str);
        return response()->json(['success' => true, 'books' => $books, 'authors' => $authors, 'user_profile_base_url' => getUrl(Config::get('constants')['USER_PROFILE_PATH']), 'cover_base_url' => getUrl(Config::get('constants')['BOOK_COVERS_PATH'])], 200);
    }
    public function searchBooksForAdmin(Request $request)
    {
        $PAGINATION_LIMIT = $request->limit ? $request->limit : Config::get('constants')['PAGINATION_LIMIT'];
        $user = $request->logged_in_user->id;
        $check_admin = UserRole::where('user_id',$user)->where('role_id',1)->first();
        if(empty($check_admin)){
            return response()->json(['success'=>false,'access'=>'Only admin can access this route']);
        }
        $search_str = $request->key;
        $books = Book::where('name', 'LIKE', "%{$search_str}%")->orWhere('author_name', 'LIKE', "%{$search_str}%")->with('author:id,name,photo_url,email')->withCount(['library as downloads' => function (Builder $query) {
            $query->where('user_id', '!=', 'author');
        }])->withCount(['library as last_seven_days' => function (Builder $query) {
            $query->where('created_at', '>=', Carbon::now()->subDays(7));
        }])->paginate($PAGINATION_LIMIT);
        return response()->json(['success' => true, 'books' => $books, 'cover_base_url' => getUrl(Config::get('constants')['BOOK_COVERS_PATH'])], 200);
    }
}