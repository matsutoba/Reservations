using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Reservation.Entity
{
    public class Reservation : BaseEntity
    {

        public int ReservationId { set; get; }
        public int CustomerId { set; get; }

        public string ReservationDate { set; get; }

        public int TimeFrameId { set; get; }

        // ---

        public Customer Customer { set; get; }
        public TimeFrame TimeFrame { set; get; } 

    }
}
