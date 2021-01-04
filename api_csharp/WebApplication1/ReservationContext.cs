using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;
using Reservation.Entity;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Reservation
{
    public class Blog
    {
        public int BlogId { get; set; }
        public string Url { get; set; }

        public List<Post> Posts { get; set; }
    }

    public class Post
    {
        public int PostId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int BlogId { get; set; }
        public Blog Blog { get; set; }
    }



    public class ReservationContext : DbContext
    {

        public ReservationContext(
            DbContextOptions options
            ) : base(options)
        {
        }

        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Post> Posts { get; set; }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Reservation.Entity.Reservation> Reservations { get; set; }
        public DbSet<Facility> Facilities { get; set; }
        public DbSet<Frame> Frames { get; set; }
        public DbSet<TimeFrame> TimeFrames { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.LogTo(m => Debug.WriteLine(m));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.HasDefaultSchema("dbo");

            // https://qiita.com/stin_dev/items/70497c92cc0c90260c69

            modelBuilder.Entity<Blog>(entity =>
            {
                entity.ToTable("blog");
                entity.Property(e => e.BlogId)
                    .HasColumnName("blogid");
                entity.Property(e => e.Url)
                    .HasColumnName("url");
            });
            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("post");
                entity.Property(e => e.PostId)
                    .HasColumnName("postid");
                entity.Property(e => e.Title)
                    .HasColumnName("title");
                entity.Property(e => e.Content)
                    .HasColumnName("content");
                entity.Property(e => e.BlogId)
                    .HasColumnName("blogid");

            });


            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id)
                    .HasColumnName("id");
                entity.Property(e => e.Name)
                    .HasColumnName("name");
                entity.Property(e => e.IsDeleted)
                    .HasColumnName("isdeleted");
                entity.Property(e => e.CreatedAt)
                    .HasColumnName("createdat");
                entity.Property(e => e.CreateUser)
                    .HasColumnName("createuser");
                entity.Property(e => e.ModifiedAt)
                    .HasColumnName("modifiedat");
                entity.Property(e => e.ModifyUser)
                    .HasColumnName("modifyuser");
            });


            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("customer");
                entity.Property(e => e.CustomerId)
                    .HasColumnName("id");
                entity.Property(e => e.Name)
                    .HasColumnName("name");
                entity.Property(e => e.IsDeleted)
                    .HasColumnName("isdeleted");
                entity.Property(e => e.CreatedAt)
                    .HasColumnName("createdat");
                entity.Property(e => e.CreateUser)
                    .HasColumnName("createuser");
                entity.Property(e => e.ModifiedAt)
                    .HasColumnName("modifiedat");
                entity.Property(e => e.ModifyUser)
                    .HasColumnName("modifyuser");

                entity.HasMany(c => c.Reservations)
                    .WithOne(r => r.Customer);

            });

            modelBuilder.Entity<Facility>(entity =>
            {
                entity.ToTable("facility");
                entity.Property(e => e.Id)
                    .HasColumnName("id");
                entity.Property(e => e.Name)
                    .HasColumnName("name");
                entity.Property(e => e.IsDeleted)
                    .HasColumnName("isdeleted");
                entity.Property(e => e.CreatedAt)
                    .HasColumnName("createdat");
                entity.Property(e => e.CreateUser)
                    .HasColumnName("createuser");
                entity.Property(e => e.ModifiedAt)
                    .HasColumnName("modifiedat");
                entity.Property(e => e.ModifyUser)
                    .HasColumnName("modifyuser");
            });

            modelBuilder.Entity<Frame>(entity =>
            {
                entity.ToTable("frame");
                entity.Property(e => e.Id)
                    .HasColumnName("id");
                entity.Property(e => e.FacilityId)
                    .HasColumnName("facilityid");
                entity.Property(e => e.StartDate)
                    .HasColumnName("startdate");
                entity.Property(e => e.EndDate)
                    .HasColumnName("enddate");
                entity.Property(e => e.IsDeleted)
                    .HasColumnName("isdeleted");
                entity.Property(e => e.CreatedAt)
                    .HasColumnName("createdat");
                entity.Property(e => e.CreateUser)
                    .HasColumnName("createuser");
                entity.Property(e => e.ModifiedAt)
                    .HasColumnName("modifiedat");
                entity.Property(e => e.ModifyUser)
                    .HasColumnName("modifyuser");
                
            });

            modelBuilder.Entity<TimeFrame>(entity =>
            {
                entity.ToTable("timeframe");
                entity.Property(e => e.TimeFrameId)
                    .HasColumnName("id");
                entity.Property(e => e.FrameId)
                    .HasColumnName("frameid");
                entity.Property(e => e.DayOfWeek)
                    .HasColumnName("dayofweek");
                entity.Property(e => e.StartTime)
                    .HasColumnName("starttime");
                entity.Property(e => e.EndTime)
                    .HasColumnName("endtime");
                entity.Property(e => e.IsDeleted)
                    .HasColumnName("isdeleted");
                entity.Property(e => e.CreatedAt)
                    .HasColumnName("createdat");
                entity.Property(e => e.CreateUser)
                    .HasColumnName("createuser");
                entity.Property(e => e.ModifiedAt)
                    .HasColumnName("modifiedat");
                entity.Property(e => e.ModifyUser)
                    .HasColumnName("modifyuser");
            });

            modelBuilder.Entity<Reservation.Entity.Reservation>(entity =>
            {
                entity.ToTable("reservation");
                entity.Property(e => e.ReservationId)
                    .HasColumnName("id");
                entity.Property(e => e.CustomerId)
                    .HasColumnName("customerid");
                entity.Property(e => e.ReservationDate)
                    .HasColumnName("reservationdate");
                entity.Property(e => e.TimeFrameId)
                    .HasColumnName("reservationtimeframeid");
                entity.Property(e => e.IsDeleted)
                    .HasColumnName("isdeleted");
                entity.Property(e => e.CreatedAt)
                    .HasColumnName("createdat");
                entity.Property(e => e.CreateUser)
                    .HasColumnName("createuser");
                entity.Property(e => e.ModifiedAt)
                    .HasColumnName("modifiedat");
                entity.Property(e => e.ModifyUser)
                    .HasColumnName("modifyuser");


                entity.HasOne(e => e.Customer)
                    .WithMany(r => r.Reservations)
                    .HasForeignKey(r => r.CustomerId);
                    

            });
            /*
            modelBuilder.Entity<Facility>(Entity =>
            {

            });
            */

            base.OnModelCreating(modelBuilder);
        }
    }
}
