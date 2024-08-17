export function formatTimestamp(timestamp: number, format: string): string {
    const date = new Date(timestamp);
    
    const formatMap: { [key: string]: string | number } = {
      'YYYY': date.getFullYear(),
      'MM': String(date.getMonth() + 1).padStart(2, '0'),
      'DD': String(date.getDate()).padStart(2, '0'),
      'HH': String(date.getHours()).padStart(2, '0'),
      'mm': String(date.getMinutes()).padStart(2, '0'),
      'ss': String(date.getSeconds()).padStart(2, '0'),
      'SSS': String(date.getMilliseconds()).padStart(3, '0')
    };
  
    return format.replace(/YYYY|MM|DD|HH|mm|ss|SSS/g, match => String(formatMap[match]));
  }