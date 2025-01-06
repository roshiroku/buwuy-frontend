import { useMemo } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import { useOrders } from '../../services/order.service';
import { useUsers } from '../../services/user.service';

const AdminDashboard = () => {
  const { orders, isLoading: isLoadingOrders } = useOrders({});
  const { users, isLoading: isLoadingUsers } = useUsers({});

  const orderStats = useMemo(() => {
    const incomeByDate = {};
    const ordersByDate = {};
    const salesByDate = {};

    if (orders) {
      orders.forEach((order) => {
        const date = dayjs(order.createdAt).format('YYYY-MM-DD');
        if (!incomeByDate[date]) incomeByDate[date] = 0;
        if (!ordersByDate[date]) ordersByDate[date] = 0;
        if (!salesByDate[date]) salesByDate[date] = 0;

        incomeByDate[date] += order.subtotal;
        ordersByDate[date] += 1;

        order.items.forEach(({ amount }) => {
          salesByDate[date] += amount;
        });
      });
    }

    return {
      incomeByDate,
      ordersByDate,
      salesByDate,
    };
  }, [orders]);

  const userStats = useMemo(() => {
    const signupsByDate = {};

    if (users) {
      users.forEach((user) => {
        const date = dayjs(user.createdAt).format('YYYY-MM-DD');
        if (!signupsByDate[date]) signupsByDate[date] = 0;
        signupsByDate[date] += 1;
      });
    }

    return { signupsByDate };
  }, [users]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4, px: 2 }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1, mb: 4 }}>
        Admin Dashboard
      </Typography>
      {isLoadingOrders || isLoadingUsers ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 4,
          '& .apexcharts-menu, & .apexcharts-xaxistooltip.apexcharts-theme-light, & .apexcharts-yaxistooltip.apexcharts-theme-light, & .apexcharts-tooltip.apexcharts-theme-light': {
            backgroundColor: 'background.default'
          },
          '& .apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title': {
            backgroundColor: 'background.paper'
          }
        }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Income Over Time</Typography>
              {isLoadingOrders ? (
                <CircularProgress />
              ) : (
                <Chart
                  options={{
                    chart: { id: 'income-by-date' },
                    xaxis: { categories: Object.keys(orderStats.incomeByDate) },
                  }}
                  series={[{ name: 'Income', data: Object.values(orderStats.incomeByDate) }]}
                  type="line"
                  height={300}
                />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6">Orders Over Time</Typography>
              {isLoadingOrders ? (
                <CircularProgress />
              ) : (
                <Chart
                  options={{
                    chart: { id: 'orders-by-date' },
                    xaxis: { categories: Object.keys(orderStats.ordersByDate) },
                  }}
                  series={[{ name: 'Orders', data: Object.values(orderStats.ordersByDate) }]}
                  type="line"
                  height={300}
                />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6">Signups Over Time</Typography>
              {isLoadingUsers ? (
                <CircularProgress />
              ) : (
                <Chart
                  options={{
                    chart: { id: 'signups-by-date' },
                    xaxis: { categories: Object.keys(userStats.signupsByDate) },
                  }}
                  series={[{ name: 'Signups', data: Object.values(userStats.signupsByDate) }]}
                  type="line"
                  height={300}
                />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6">Sales Over Time</Typography>
              {isLoadingOrders ? (
                <CircularProgress />
              ) : (
                <Chart
                  options={{
                    chart: { id: 'sales-by-date' },
                    xaxis: { categories: Object.keys(orderStats.salesByDate) },
                  }}
                  series={[{ name: 'Sales', data: Object.values(orderStats.salesByDate) }]}
                  type="line"
                  height={300}
                />
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default AdminDashboard;
