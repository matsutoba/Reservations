using System;
using System.Collections.Generic;
using System.Linq;

namespace Reservation.Entity
{
    public class Frame : BaseEntity
    {
        public int Id { set; get; }

        public int FacilityId { set; get; }

        public DateTime StartDate { set; get; }
        public DateTime EndDate { set; get; }

        // ---- Navigation Property

        public Facility Facility { set; get; }

        public List<TimeFrame> TimeFrames { set; get; }
    }
}
