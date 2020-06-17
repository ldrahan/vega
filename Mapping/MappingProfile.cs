using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Vega.Controllers.Resources;
using Vega.Core.Models;

namespace Vega.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Domain to API Resource
            CreateMap<Make, MakeResource>();
            CreateMap<Make, KeyValuePairResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<Vehicle, SaveVehicleResource>()
            .ForMember(vr => vr.Features, opt => opt.MapFrom(o => o.Features.Select(f => f.FeatureId)));
            CreateMap<Vehicle, VehicleResource>()
            .ForMember(vr => vr.Make, opt => opt.MapFrom(o => o.Model.Make))
            .ForMember(vr => vr.Features, opt => opt.MapFrom(o => o.Features.Select(f => new KeyValuePairResource
            {
                Id = f.FeatureId,
                Name = f.Feature.Name
            })));

            //Api Resource to Domain
            CreateMap<SaveVehicleResource, Vehicle>()
            .ForMember(v => v.Id, opt => opt.Ignore())
            .ForMember(v => v.Features, opt => opt.Ignore())
            .AfterMap((vr, v) =>
            {
                //remove unselected features
                v.Features.Where(f => !vr.Features.Contains(f.FeatureId)).ToList()
                .ForEach(i => v.Features.Remove(i));

                //add new features
                vr.Features.Where(id => !v.Features.Any(f => f.FeatureId == id))
                .Select(i => new VehicleFeature { FeatureId = i }).ToList()
                .ForEach(f => v.Features.Add(f));
            });
        }
    }
}