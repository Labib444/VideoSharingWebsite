using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Model
{
    public class Reaction
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RId { get; set; }

        [Required]
        public Boolean ReactionType { get; set; }
        //public int Quantity { get; set; }
        //public DateTime CreatedDate { get; set; } = DateTime.Now;
    }


}