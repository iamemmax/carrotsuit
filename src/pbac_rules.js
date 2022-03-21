const rules = {
  Free: [
    'staff:add',
    'invite:schedule',
    'email-message:send',
    'invite-link:send',
    'slide-images:add',
    'location:add'
  ],
  Basic: [
    'staff:add',
    'invites:schedule',
    'email-message:send',
    'invite-link:send',
    'slide-images:add',
    'location:add',
    'custom-signin:add',
    'exhibition-mode:enable',
    'custom-signin-message:add',
    'invite-list:read',
    'invites:export',
    'visitor-items:require',
    'visitor-car:require',
  ],
  Premium: [
    'staff:add',
    'invites:schedule',
    'email-message:send',
    'invite-link:send',
    'slide-images:add',
    'location:add',
    'custom-field:add',
    'custom-signin:add',
    'exhibition-mode:enable',
    'appointment-only:enable',
    'custom-signin-message:add',
    'invite-list:read',
    'visit-type:add',
    'assistant:add',
    'visitor-photo:require',
    'invites:export',
    'visitor-items:require',
    'visitor-car:require',
    'assistant_notif',
    'sms-notif'
  ],
  Enterprise: [
    'staff:add',
    'appointment-only:enable',
    'custom-field:add',
    'invites:schedule',
    'email-message:send',
    'invite-link:send',
    'slide-images:add',
    'location:add',
    'custom-signin:add',
    'exhibition-mode:enable',
    'custom-signin-message:add',
    'invite-list:read',
    'visit-type:add',
    'assistant:add',
    'visitor-photo:require',
    'invites:export',
    'visitor-items:require',
    'visitor-car:require',
    'assistant_notif',
    'sms-notif'
  ],
  Trial: [
    'staff:add',
    'appointment-only:enable',
    'custom-field:add',
    'invites:schedule',
    'email-message:send',
    'invite-link:send',
    'slide-images:add',
    'location:add',
    'custom-signin:add',
    'exhibition-mode:enable',
    'custom-signin-message:add',
    'invite-list:read',
    'visit-type:add',
    'visitor-photo:require',
    'assistant:add',
    'invites:export',
    'visitor-items:require',
    'visitor-car:require',
    'assistant_notif',
    'sms-notif'
  ]
};

export default rules