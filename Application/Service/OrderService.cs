using Application.Interface;
using Core.DTO;
using Core.Entity;
using Core.Interface;

namespace Application.Service;

public class OrderService : IOrderService
{
    private readonly IUnitOfWork _unitOfWork;

    public OrderService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    
    public IEnumerable<Order> GetOrdersByUsername(string username)
    {
        return _unitOfWork.Orders.GetOrdersByUsername(username);
    }

    public IEnumerable<OrderDetailReadDTO> GetOrderDetailsByUsername(string username)
    {
        return _unitOfWork.Orders.GetOrderDetailsByUsername(username);
    }

    public async Task<bool> AddOrder(OrderDTO o)
    {
        var order = new Order
        {
            UserId = o.Username != "" ? _unitOfWork.Users.GetUserIdByUsername(o.Username) : 0,
            Address = o.Address,
            Email = o.Email,
            FullName = o.FullName,
            Phone = o.Phone,
            Total = o.Total,
            DatePurchased = DateTime.Now,
            Status = 0
        };
        
        order.Point = (int)(order.UserId > 0 ? o.Total / 10000 : 0);

        int id = _unitOfWork.Orders.AddOrder(order);
        if (order.UserId > 0)
            _unitOfWork.Users.GainPoint(order.UserId, order.Point);

        foreach (var odDTO in o.OrderDetails)
        {
            OrderDetail od = new OrderDetail
            {
                OrderId = id,
                Sku = odDTO.Sku,
                Price = odDTO.Price,
                Quantity = odDTO.Quantity
            };
            bool valid = _unitOfWork.ProductDetails.CheckChangeQuantity(od.Sku, (int)(od.Quantity * -1));
            if (!valid) return false;

            _unitOfWork.Orders.AddOrderDetail(od);
            _unitOfWork.ProductDetails.ChangeQuantity(od.Sku, (int)(od.Quantity * -1));
            _unitOfWork.Carts.Delete((int)(order.UserId), od.Sku);
        }
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> CancelOrder(int id)
    {
        _unitOfWork.Orders.CancelOrder(id);
        return await _unitOfWork.SaveChangesAsync();
    }
    
    public async Task<bool> ReceiveOrder(int id)
    {
        _unitOfWork.Orders.ReceiveOrder(id);
        return await _unitOfWork.SaveChangesAsync();
    }
}