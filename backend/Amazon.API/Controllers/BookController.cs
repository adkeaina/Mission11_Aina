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
    public IEnumerable<Book> GetBooks() => _context.Books.ToList();
}