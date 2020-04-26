import React from 'react';
import { notification } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';

const openNotification = (message, desc, type) => {
    notification.open({
        message: message,
        description:
            desc,
        icon: type === 'success' && <CheckCircleTwoTone />,
    });
};

export default openNotification