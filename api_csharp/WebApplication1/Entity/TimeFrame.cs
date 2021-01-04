using System;
using System.Collections.Generic;
using System.Linq;

namespace Reservation.Entity
{
    public class TimeFrame : BaseEntity
    {
        public int TimeFrameId { set; get; }

        public int FrameId { set; get; }

        public int DayOfWeek { set; get; }

        public string StartTime { set; get; }
        public string EndTime { set; get; }

        // ---

        public Frame Frame { set; get; }

    }
}
