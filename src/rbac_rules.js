const rules = {
    GLOBAL_ADMIN: [
        'staff-directory:read',
        'staff-directory:write',
        'staff-directory:edit',
        'admin-roles:write',
        'admin-roles:read',
        'admin-roles:edit',
        'billing-details:edit',
        'billing-details:read',
        'loction:write',
        'own-visitors:read',
        'all-visitors:read',
        'visitors:create',
        'visitors:edit',
        'visitors:delete',
        'visitor-directory:write',
        'bulk-invites:create',
        'invites:create',
        'invites:read',
        'invites:edit',
        'invites:delete',
        'billing-details:read',
        'billing-details:edit',
        'settings:edit',
        'tenant-directory:read',
        'tenant-directory:write',
        'tenant-directory:edit',
        'billing:read',
        'invites:export'

    ],
    LOCATION_ADMIN: [
        'staff-directory:read',
        'staff-directory:write',
        'staff-directory:edit',
        'admin-roles:write',
        'admin-roles:read',
        'admin-roles:edit',
        'own-visitors:read',
        'all-visitors:read',
        'visitors:create',
        'visitors:edit',
        'visitors:delete',
        'visitor-directory:write',
        'invites:create',
        'bulk-invites:create',
        'invites:read',
        'invites:edit',
        'invites:delete',
        'settings:edit',
        'billing:read',
        'invites:export'
    ],
    CARE_TAKER: [
        'tenant-directory:read',
        'tenant-directory:write',
        'tenant-directory:edit',
        'own-visitors:read',
        'all-visitors:read',
        'visitors:create',
        'visitors:edit',
        'visitors:delete',
        'invites:create',
        'invites:read',
        'invites:edit',
        'invites:delete',
        'visitor-directory:write',
        'invites:export'
    ],
    FRONT_DESK_ADMIN: [
        'staff-directory:read',
        'admin-roles:read',
        'own-visitors:read',
        'all-visitors:read',
        'visitors:create',
        'visitors:edit',
        'invites:create',
        'invites:read',
        'invites:edit',
        'invites:delete',
        'visitor-directory:write',
        'invites:export'
    ],
    BILLING_ADMIN: [
        'billing-details:read',
        'billing-details:edit',
    ],
    DILIVERY_ADMIN: [
        
    ],
    SECURITY_ADMIN: [
        'invites:read',
        'invites:export'
    ],
    TENANT: [
        'own-visitors:read',
        'invites:create',
        'invites:read',
        'invites:read'
    ],
    EMPLOYEE: [
        'own-visitors:read',
        'invites:create',
        'invites:read',
        'invites:read'
    ]
    
 }
export default rules;