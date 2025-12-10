async function generateExercises() {
  try {
    console.log('Generating exercises...');
    
    // Dynamic import for node-fetch v3+
    const fetch = (await import('node-fetch')).default;
    
    // Xóa dữ liệu cũ trước
    console.log('Deleting old exercises...');
    const deleteResponse = await fetch('http://localhost:3000/api/exercises', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (deleteResponse.ok) {
      const deleteData = await deleteResponse.json();
      console.log('✓ Deleted:', deleteData.message);
    }
    
    // Tạo dữ liệu mới
    console.log('Creating new exercises...');
    const response = await fetch('http://localhost:3000/api/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('✓ Success:', data);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

generateExercises();
