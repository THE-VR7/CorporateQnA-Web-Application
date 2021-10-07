using System;
using System.Collections.Generic;
using System.Text;

namespace Modals.DataViewModels
{
    public class CategoryDetailsView
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Tags { get; set; }
        public int TagsThisWeek { get; set; }
        public int TagsThisMonth { get; set; }
    }
}
