using System;
using System.Collections.Generic;
using System.Text;
using PetaPoco;

namespace Modals.DataModels
{
    [TableName("Likes")]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class Like
    {
        public int Id { get; set; }
        public int AnswerId { get; set; }
        public string UserId { get; set; }
        public bool IsLiked { get; set; }
        public bool IsDisliked { get; set; }
    }
}
