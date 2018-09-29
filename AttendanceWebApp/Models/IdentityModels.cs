using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AttendanceWebApp.Models
{
    public class ApplicationUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Company> Companies { get; set; }

        public DbSet<WorkGroups> WorkGroups { get; set; }

        public DbSet<Units> Units { get; set; }

        public DbSet<Designations> Designations { get; set; }

        public DbSet<Grades> Grades { get; set; }

        public DbSet<Departments> Departments { get; set; }

        public DbSet<Stations> Stations { get; set; }

        public DbSet<Sections> Sections { get; set; }

        public DbSet<Categories> Categories { get; set; }

        public DbSet<EmpTypes> EmpTypes { get; set; }

        public DbSet<Employees> Employees { get; set; }

        public DbSet<LeaveTypes> LeaveTypes { get; set; }

        public DbSet<ReleaseGroups> ReleaseGroups { get; set; }

        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
        }
    }
}
