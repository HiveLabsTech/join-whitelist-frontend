import * as validUrl from 'valid-url';

// 验证合法url
export const validateUrl = (rule: any, value: string) => {
    if (!validUrl.isUri(value)) {
        return Promise.reject('Please enter a legal website URL!');
    }
    return Promise.resolve();
};