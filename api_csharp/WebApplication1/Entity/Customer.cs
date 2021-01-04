using System;
using System.Collections.Generic;
using System.Linq;

namespace Reservation.Entity
{
    public class Customer : BaseEntity
    {        
        public int CustomerId { set; get; }
        
        public string Name { set; get; }

        // --- Navigation Property

        public List<Reservation> Reservations { set; get; }

    }
}
