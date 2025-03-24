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
}