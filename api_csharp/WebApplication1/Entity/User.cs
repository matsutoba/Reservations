using System;
using System.Collections.Generic;
using System.Linq;

namespace Reservation.Entity
{
    public class User : BaseEntity
    {
        public int Id { set; get; }
        public string Name { set; get; }

    }
}
