using Microsoft.AspNetCore.Mvc;
using Projet_visualisation.Data;
using Projet_visualisation.Models;

namespace Projet_visualisation.Controllers
{
    [ApiController]
    [Route("api/epargne")]
    public class EpargneInvestmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EpargneInvestmentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.EpargneInvestments.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var investment = _context.EpargneInvestments.Find(id);
            if (investment == null) return NotFound();
            return Ok(investment);
        }

        [HttpPost]
        public IActionResult Create([FromBody] EpargneInvestment investment)
        {
            _context.EpargneInvestments.Add(investment);
            _context.SaveChanges();
            return Ok(investment);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] EpargneInvestment updated)
        {
            var investment = _context.EpargneInvestments.Find(id);
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
            var investment = _context.EpargneInvestments.Find(id);
            if (investment == null) return NotFound();

            _context.EpargneInvestments.Remove(investment);
            _context.SaveChanges();
            return NoContent();
        }
    }
}