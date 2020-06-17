using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Vega.Controllers.Resources;

namespace Vega.Controllers
{
    public class FeaturesController : Controller
    {
        private readonly VegaDbContext vegaDbContext;
        private readonly IMapper mapper;

        public FeaturesController(VegaDbContext vegaDbContext, IMapper mapper)
        {
            this.mapper = mapper;
            this.vegaDbContext = vegaDbContext;
        }

        [HttpGet("api/features")]
        public IEnumerable<KeyValuePairResource> GetFeatures()
        {
            var features = vegaDbContext.Features;
            return mapper.Map<IEnumerable<KeyValuePairResource>>(features);
        }
    }
}