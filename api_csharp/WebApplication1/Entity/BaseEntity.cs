using System;
using System.Collections.Generic;
using System.Linq;

namespace Reservation.Entity
{
    public class BaseEntity
    {

        public int IsDeleted { set; get; }

        public DateTime CreatedAt { set; get; }
        public string CreateUser { set; get; }
        public DateTime? ModifiedAt { set; get;}

        private string modifyUser;

        public string ModifyUser
        {
            get { return modifyUser; }
            set { modifyUser = value; }
        }
    }
}
