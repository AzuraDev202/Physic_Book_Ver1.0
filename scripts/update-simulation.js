async function updateSimulation() {
  try {
    console.log('Đang gọi API updateSimulation...');
    const response = await fetch('http://localhost:3000/api/updateSimulation', {
      method: 'POST',
    });
    
    const data = await response.json();
    console.log('Kết quả:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Lỗi:', error.message);
  }
}

updateSimulation();
