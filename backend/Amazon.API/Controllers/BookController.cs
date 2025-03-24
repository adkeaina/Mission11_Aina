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
    public IActionResult GetBooks(int pageSize = 10, int pageNumber = 1)
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
        
        var booklist = _context.Books
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var bookCount = _context.Books.Count();

        var pageCount = (int)Math.Ceiling((double)bookCount / pageSize);

        var someObject = new
        {
            Books = booklist,
            BookCount = bookCount,
            PageCount = pageCount
        };

        return Ok(someObject);
    }
}