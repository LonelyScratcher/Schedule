export function saveUser(user){
    const userJson = JSON.stringify(user)
    return localStorage.setItem('user',userJson)
}

export function removeUser(user){
    return localStorage.removeItem('user')
}

export function getUser(){
    const userJson = localStorage.getItem('user')
    if (userJson === undefined || userJson ===null) return null;
    return JSON.parse(userJson)
}

export function dateStr(str){
    if (str==='') return ''
    const date = new Date(str)
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从 0 开始，所以要加 1
    const day = date.getDate();

    return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
}
