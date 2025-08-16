export const rawQueryNearestStore = `
    SELECT 
      id, 
      storeName, 
      address, 
      city, 
      province, 
      country, 
      latitude, 
      longitude,
      ( 
        6371000 * acos( 
          cos(radians(?)) * cos(radians(latitude)) * 
          cos(radians(longitude) - radians(?)) + 
          sin(radians(?)) * sin(radians(latitude))
        ) 
      )/1000 AS distance
    FROM stores
    WHERE deletedAt IS NULL
    HAVING distance <= 100
    ORDER BY distance ASC
    LIMIT 1;
    `