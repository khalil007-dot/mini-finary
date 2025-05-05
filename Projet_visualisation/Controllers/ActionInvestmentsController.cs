using Microsoft.AspNetCore.Mvc;
using Projet_visualisation.Data;
using Projet_visualisation.Models;

namespace Projet_visualisation.Controllers
{
    [ApiController]
    [Route("api/action")]
    public class ActionInvestmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ActionInvestmentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.ActionInvestments.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var investment = _context.ActionInvestments.Find(id);
            if (investment == null) return NotFound();
            return Ok(investment);
        }

        [HttpPost]
        public IActionResult Create([FromBody] ActionInvestment investment)
        {
            _context.ActionInvestments.Add(investment);
            _context.SaveChanges();
            return Ok(investment);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] ActionInvestment updated)
        {
            var investment = _context.ActionInvestments.Find(id);
            if (investment == null) return NotFound();

            investment.PlatformOrBank = updated.PlatformOrBank;
            investment.AmountInvested = updated.AmountInvested;
            investment.CurrentAmount = updated.CurrentAmount;
            investment.PurchaseDate = updated.PurchaseDate;

            _context.SaveChanges();
            return Ok(investment);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var investment = _context.ActionInvestments.Find(id);
            if (investment == null) return NotFound();

            _context.ActionInvestments.Remove(investment);
            _context.SaveChanges();
            return NoContent();
        }
    }
}