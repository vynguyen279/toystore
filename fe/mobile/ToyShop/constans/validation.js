import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ!').required('*Bắt buộc'),
    pass: Yup.string()
        .min(8, 'Phải đủ 8 ký tự!')
        .max(8, 'Chỉ có 8 ký tự!')
        .required('*Bắt buộc'),
});

export const SignupSchema = Yup.object().shape({
    // user: Yup.string()
    //     .min(2, 'Quá ngắn!')
    //     .max(50, 'Quá dài!')
    //     .required('*Bắt buộc'),
    email: Yup.string().email('Email không hợp lệ!').required('*Bắt buộc'),
    pass: Yup.string()
        .min(8, 'Phải đủ 8 ký tự!')
        .max(8, 'Chỉ có 8 ký tự!')
        .required('*Bắt buộc'),
    rePass: Yup.string()
        .min(8, 'Phải đủ 8 ký tự!')
        .max(8, 'Chỉ có 8 ký tự!')
        .required('*Bắt buộc'),
});

export const InformationSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(5, 'Quá ngắn!')
        .max(50, 'Quá dài!')
        .required('*Bắt buộc'),
    phone: Yup.string()
        .min(10, 'Phải đủ 10 số!')
        .max(10, 'Chỉ có 10 số!')
        .required('*Bắt buộc'),
    // email: Yup.string().email('Email không hợp lệ!').required('*Bắt buộc'),
    address: Yup.string()
        .min(10, 'Quá ngắn!')
        .max(50, 'Quá dài!')
        .required('*Bắt buộc'),
});

export const ChangePassSchema = Yup.object().shape({
    oldPass: Yup.string()
        .min(8, 'Phải đủ 8 ký tự!')
        .max(8, 'Chỉ có 8 ký tự!')
        .required('*Bắt buộc'),
    newPass: Yup.string()
        .min(8, 'Phải đủ 8 ký tự!')
        .max(8, 'Chỉ có 8 ký tự!')
        .required('*Bắt buộc'),
    rePass: Yup.string()
        .min(8, 'Phải đủ 8 ký tự!')
        .max(8, 'Chỉ có 8 ký tự!')
        .required('*Bắt buộc'),
});

export const GetPassSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ!').required('*Bắt buộc'),
});


