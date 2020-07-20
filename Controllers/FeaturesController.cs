using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Vega.Controllers.Resources;
using Vega.Persistence;

namespace Vega.Controllers
{
    public class FeaturesController : Controller
    {
        private readonly VegaDbContext _vegaDbContext;
        private readonly IMapper _mapper;

        public FeaturesController(VegaDbContext vegaDbContext, IMapper mapper)
        {
            _mapper = mapper;
            _vegaDbContext = vegaDbContext;
        }

        [HttpGet("api/features")]
        public IEnumerable<KeyValuePairResource> GetFeatures()
        {
            var features = _vegaDbContext.Features;
            return _mapper.Map<IEnumerable<KeyValuePairResource>>(features);
        }
    }
}