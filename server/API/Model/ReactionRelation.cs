using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Model
{
    public class ReactionRelation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RId { get; set; }

        public int UId { get; set; }
        [ForeignKey("UId")]
        public User user { get; set; }

        public int VId { get; set; }
        [ForeignKey("VId")]
        public Video video { get; set; }

        //public int Quantity { get; set; }
        //public DateTime CreatedDate { get; set; } = DateTime.Now;
    }


}