export function formatDate  (time: string | number | Date,format='YY-MM-DD hh:mm:ss')  {
	let date = new Date(time);

	let year = date.getFullYear(),
		month = date.getMonth()+1,//月份是从0开始的
		day = date.getDate(),
		hour = date.getHours(),
		min = date.getMinutes(),
		sec = date.getSeconds();
	let preArr = Array.apply(null,Array(10)).map(function(elem, index) {
		return '0'+index;
	});

	let newTime = format.replace(/YY/g,year.toString())
						.replace(/MM/g,(preArr[month]||month).toString())
						.replace(/DD/g,(preArr[day]||day).toString())
						.replace(/hh/g,(preArr[hour]||hour).toString())
						.replace(/mm/g,(preArr[min]||min).toString())
						.replace(/ss/g,(preArr[sec]||sec).toString());

	return newTime;			
}