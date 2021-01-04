using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reservation.Model.Request
{
    public class RegistReservationRequestModel
    {
        public int CustomerId { set; get; }

        public string ReservationDate { set; get; }

        public int ReservationTimeFrameId { set; get; }

    }
}
