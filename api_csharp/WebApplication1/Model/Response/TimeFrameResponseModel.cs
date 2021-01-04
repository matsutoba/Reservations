using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reservation.Model.Response
{
    public class TimeFrameResponseModel
    {
        public int DayOfWeek { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }

        public int FrameId { get; set; }

    }
}
