using HSS_WEBAPI_MICROSERVICE.Models;
using Microsoft.EntityFrameworkCore;

namespace HSS_WEBAPI_MICROSERVICE.Context
{
	public class HSSContext : DbContext
	{
		public HSSContext(DbContextOptions<HSSContext> options) : base(options) { }

		public DbSet<Account> Accounts { get; set; }
		public DbSet<AccountType> AccountTypes { get; set; }
		public DbSet<Workshop> Workshops { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<Location> Locations { get; set; }
		public DbSet<Company> Companies { get; set; }
		public DbSet<AccountWorkshop> AccountWorkshops { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
	

			// Konfigurer many-to-many relationen mellem Account og Workshop
			modelBuilder.Entity<AccountWorkshop>()
				.HasKey(aw => new { aw.AccountId, aw.WorkshopId });

			modelBuilder.Entity<AccountWorkshop>()
				.HasOne(aw => aw.Account)
				.WithMany(a => a.AccountWorkshops)
				.HasForeignKey(aw => aw.AccountId);

			modelBuilder.Entity<AccountWorkshop>()
				.HasOne(aw => aw.Workshop)
				.WithMany(w => w.AccountWorkshops)
				.HasForeignKey(aw => aw.WorkshopId);

			// tilføjelse for at gøre visse felter "Unique", fx: some Usernames m.m. + for også at undgå duplicates 
			modelBuilder.Entity<Account>()
				.HasIndex(a => a.Username)
				.IsUnique();
			modelBuilder.Entity<AccountType>()
				.HasIndex(a => a.Name)
				.IsUnique();
			modelBuilder.Entity<Category>()
				.HasIndex(a => a.Name)
				.IsUnique();
			modelBuilder.Entity<Company>()
				.HasIndex(a => a.Name)
				.IsUnique();

			//sikre at der ikke oprettes en workshop med sammenavn og startdato i workshops
			modelBuilder.Entity<Workshop>()
				.HasIndex(w => new { w.Name, w.Start })
				.IsUnique();




		}
	}
}
