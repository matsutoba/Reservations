using System;
using System.Collections.Generic;
using System.Linq;

namespace Reservation.Entity
{
    public class Facility : BaseEntity
    {
        public int Id { set; get; }
        public string Name { set; get; }

        // --- Navigation property

        public List<Frame> Frames { set; get; }

    }
}
