using Amazon.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace Amazon.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookController : ControllerBase
{
    private BookstoreContext _context;

    public BookController(BookstoreContext context) => _context = context;

    [HttpGet("AllBooks")]
    public IActionResult GetBooks(int pageSize = 10, int pageNumber = 1, [FromQuery] List<string> categories = null)
    {
        string? favProjType = Request.Cookies["FavoriteProjectType"];
        Console.WriteLine("~~~~~~~~~~~COOKIE~~~~~~~~~~~~~~~~~~~\n" + favProjType);
        HttpContext.Response.Cookies.Append("FavoriteProjectType", "Borehole Well and Hand Pump", new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.Now.AddMinutes(1)
        });
        IQueryable<Book> query = _context.Books.AsQueryable();

        if (categories is not null && categories.Any())
        {
            query =  query.Where(b => categories.Contains(b.Category));
        }
        
        var bookCount = query.Count();
        
        var booklist = query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        
        var pageCount = (int)Math.Ceiling((double)bookCount / pageSize);

        var someObject = new
        {
            Books = booklist,
            BookCount = bookCount,
            PageCount = pageCount
        };

        return Ok(someObject);
    }
    
    [HttpGet("GetBookCategories")]
    public IActionResult GetBookCategories()
    {
        var bookTypes = _context.Books
            .Select(b => b.Category)
            .Distinct()
            .ToList();
        return Ok(bookTypes);
    }

    [HttpGet("GetBookById/{id}")]
    public IActionResult GetBookById(int id)
    {
        var book = _context.Books.Find(id);
        if (book is null)
        {
            return NotFound();
        }
        return Ok(book);
    }

    [HttpPost("AddBook")]
    public IActionResult AddBook([FromBody] Book book)
    {
        _context.Books.Add(book);
        _context.SaveChanges();
        return Ok(book);
    }

    [HttpPut("UpdateBook")]
    public IActionResult UpdateBook([FromBody] Book book)
    {
        var bookToUpdate = _context.Books.Find(book.BookId);
        if (bookToUpdate is null)
        {
            return NotFound();
        }
        bookToUpdate.Title = book.Title;
        bookToUpdate.Author = book.Author;
        bookToUpdate.Publisher = book.Publisher;
        bookToUpdate.Isbn = book.Isbn;
        bookToUpdate.Classification = book.Classification;
        bookToUpdate.Category = book.Category;
        bookToUpdate.PageCount = book.PageCount;
        bookToUpdate.Price = book.Price;
        
        _context.Books.Update(bookToUpdate);
        _context.SaveChanges();
        
        return Ok(bookToUpdate);
    }

    [HttpDelete("DeleteBook/{bookId}")]
    public IActionResult DeleteBook(int bookId)
    {
        var bookToDelete = _context.Books.Find(bookId);
        if (bookToDelete is null)
        {
            return NotFound();
        }
        _context.Books.Remove(bookToDelete);
        _context.SaveChanges();
        
        return NoContent();
    }
}