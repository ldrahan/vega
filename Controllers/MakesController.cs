using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vega.Controllers.Resources;
using Vega.Persistence;

namespace Vega.Controllers
{
    public class MakesController : Controller
    {
        private readonly VegaDbContext _context;
        private readonly IMapper _mapper;

        public MakesController(VegaDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("api/makes")]
        public IEnumerable<MakeResource> GetMakesAsync()
        {
            var makes = _context.Makes.Include(c => c.Models);
            return _mapper.Map<IEnumerable<MakeResource>>(makes);
        }
    }
}