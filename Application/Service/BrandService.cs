using Application.Interface;
using Core.Entity;
using Core.Interface;

namespace Application.Service;

public class BrandService : IBrandService
{
    private readonly IUnitOfWork _unitOfWork;

    public BrandService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public IEnumerable<Brand> GetAllBrands()
    {
        return _unitOfWork.Brands.GetAllBrands();
    }

    public async Task<bool> Insert(Brand brand)
    {
        _unitOfWork.Brands.Insert(brand);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Update(Brand brand)
    {
        _unitOfWork.Brands.Update(brand);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Lock(int id)
    {
        _unitOfWork.Brands.Lock(id);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Unlock(int id)
    {
        _unitOfWork.Brands.Unlock(id);
        return await _unitOfWork.SaveChangesAsync();
    }
}