using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Model
{
    public class Video
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VId { get; set; }

        [Required]
        public string Link { get; set; }
        //public int Quantity { get; set; }
        //public DateTime CreatedDate { get; set; } = DateTime.Now;

        [Required]
        public int Views { get; set; }
    }


}