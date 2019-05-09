
/**
 * 系统自定义工具库
 * 
 * author   : jyjin
 * date     : create at 2018.07.29
 * remark   : 
 *
 */

const isLinux = () => {
    // const allPlatform = ['darwin', 'freebsd', 'linux', 'sunos', 'win32']
    // =>                    mac       unkonwn    linux    unknown  windows
    const linuxPlatform = ['darwin', 'linux']
    return linuxPlatform.indexOf(process.platform.toLowerCase()) > -1
}


const setRes = (res, other) => {
    return res.err ? res.err : {
        res: 1,
        data: res.data || null,
        ...other
    }
}

const setErr = err => ({ err })

const setData = data => ({ data })

module.exports = {
    isLinux,
    setErr,
    setData,
    setRes,
}