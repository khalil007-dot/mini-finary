using Projet_visualisation.Models;
using Microsoft.AspNetCore.Mvc;
using Projet_visualisation.Data;
using System.Linq;

namespace Projet_visualisation.Controllers
{
    [ApiController]
    [Route("api/crypto")]
    public class CryptoInvestmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CryptoInvestmentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/crypto
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.CryptoInvestments.ToList());
        }

        // GET api/crypto/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var investment = _context.CryptoInvestments.Find(id);
            if (investment == null)
                return NotFound();
            return Ok(investment);
        }

        // POST api/crypto
        [HttpPost]
        public IActionResult Create([FromBody] CryptoInvestment investment)
        {
            _context.CryptoInvestments.Add(investment);
            _context.SaveChanges();
            return Ok(investment);
        }

        // PUT api/crypto/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] CryptoInvestment updated)
        {
            var investment = _context.CryptoInvestments.Find(id);
            if (investment == null)
                return NotFound();

            investment.PlatformOrBank = updated.PlatformOrBank;
            investment.AmountInvested = updated.AmountInvested;
            investment.CurrentAmount = updated.CurrentAmount;
            investment.PurchaseDate = updated.PurchaseDate;

            _context.SaveChanges();
            return Ok(investment);
        }

        // DELETE api/crypto/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var investment = _context.CryptoInvestments.Find(id);
            if (investment == null)
                return NotFound();

            _context.CryptoInvestments.Remove(investment);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
