/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
const ErrorType = {
  AuthorizationFailed: {
    code: 700,
    message: '授权失败',
  },
  UsernameOrPasswordWrong: {
    code: 710,
    message: '用户名或密码不正确',
  },
  ParameterRequired: {
    code: 800,
    message: '参数不可以为空',
  },
  InvalidType: {
    code: 803,
    message: '无效的类型',
  },
  DataInexistence: {
    code: 801,
    message: '数据不存在',
  },
  DataExist: {
    code: 802,
    message: '数据已存在',
  },
  DataAddFailed: {
    code: 803,
    message: '数据创建失败',
  },
  DataUpdateFailed: {
    code: 804,
    message: '数据更新失败',
  },
  DataRemoveFailed: {
    code: 805,
    message: '数据删除失败',
  },
  Others: {
    code: 999,
    message: '其它异常',
  },
};

export default ErrorType;
