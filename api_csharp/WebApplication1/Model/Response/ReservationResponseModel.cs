using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reservation.Model.Response
{
    public class ReservationResponseModel
    {
        public int ReservationId { get; set; }

        public int CustomerId { get; set; }
        public string Name { get; set; }

        public int DayOfWeek { get; set; }

        public string StartTime { get; set; }

        public string EndTime { get; set; }

        public int FacilityId { get; set; }
        public string FacilityName { get; set; }

    }
}
