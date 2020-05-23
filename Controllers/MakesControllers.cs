using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vega.Controllers.Resources;

namespace Vega.Controllers
{
    public class MakesControllers : Controller
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;

        public MakesControllers(VegaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("api/makes")]
        public IEnumerable<MakeResource> GetMakesAsync()
        {
            var makes = context.Makes.Include(c => c.Models);
            return mapper.Map<IEnumerable<MakeResource>>(makes);
        }
    }
}