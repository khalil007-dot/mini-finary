using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Projet_visualisation.Models;

namespace Projet_visualisation.Data
{
    public class AppDbContext : DbContext
    {
       

        public DbSet<ActionInvestment> ActionInvestments { get; set; }
        public DbSet<CryptoInvestment> CryptoInvestments { get; set; }
        public DbSet<EpargneInvestment> EpargneInvestments { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options)
       : base(options)
        {}
    }
}
 