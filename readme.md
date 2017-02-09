#params
input 数字位数限制---执行一次时间ms级

number-limit调起指令

zheng-num='9' 整数位数 必须

small-num='2' 小数位数 可选

#usage

'<input number-limit zheng-num='9' small-num='2' ng-model="num"/'

#how
把输入的值转换成字符串处理：以小数点位分开位数组，分别处理

$scope.$watch情况下 近似认为，每次触发只输入了一位字符