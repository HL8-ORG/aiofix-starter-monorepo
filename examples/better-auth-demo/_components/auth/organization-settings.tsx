'use client';

import { useActionState, useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@repo/design-system/components/ui/card';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import {
  createOrganizationAction,
  inviteMemberAction,
  switchOrganizationAction,
} from '@/lib/actions';
import type { UserOrganization } from '@/lib/types';
import { FORM_INITIAL_STATE } from '@/lib/constants';

interface OrganizationSettingsProps {
  organizations: UserOrganization[];
}

export function OrganizationSettings({
  organizations,
}: OrganizationSettingsProps) {
  const [createState, createFormAction] = useActionState(
    createOrganizationAction,
    FORM_INITIAL_STATE
  );

  const [switchState, switchFormAction] = useActionState(
    switchOrganizationAction,
    FORM_INITIAL_STATE
  );

  const [showInviteForm, setShowInviteForm] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏢 Organizations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-3 font-semibold">Create New Organization</h3>
          <form action={createFormAction} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input
                id="org-name"
                name="name"
                placeholder="My Company"
                required
              />
              {createState.fieldErrors &&
                'name' in createState.fieldErrors &&
                createState.fieldErrors.name?.[0] && (
                  <p className="mt-1 text-red-600 text-sm">
                    {createState.fieldErrors.name[0]}
                  </p>
                )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="org-slug">Slug (optional)</Label>
              <Input id="org-slug" name="slug" placeholder="my-company" />
              {createState.fieldErrors &&
                'slug' in createState.fieldErrors &&
                createState.fieldErrors.slug?.[0] && (
                  <p className="mt-1 text-red-600 text-sm">
                    {createState.fieldErrors.slug[0]}
                  </p>
                )}
            </div>

            <Button type="submit" className="w-full">
              Create Organization
            </Button>

            {createState.error && (
              <p className="text-red-600 text-sm">{createState.error}</p>
            )}
            {createState.success && (
              <p className="text-green-600 text-sm">
                Organization created successfully!
              </p>
            )}
          </form>
        </div>

        {organizations.length > 0 && (
          <div>
            <h3 className="mb-3 font-semibold">Your Organizations</h3>
            <div className="space-y-3">
              {organizations.map((org) => (
                <div key={org.id} className="rounded-lg border p-3">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{org.name}</h4>
                      <p className="text-gray-600 text-sm">Slug: {org.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <form action={switchFormAction}>
                        <input
                          type="hidden"
                          name="organizationId"
                          value={org.id}
                        />
                        <Button size="sm" variant="outline" type="submit">
                          Switch
                        </Button>
                      </form>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setShowInviteForm(
                            showInviteForm === org.id ? null : org.id
                          )
                        }
                      >
                        Invite
                      </Button>
                    </div>
                  </div>

                  {showInviteForm === org.id && (
                    <InviteForm
                      organizationId={org.id}
                      onCancel={() => setShowInviteForm(null)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {switchState.error && (
          <p className="text-red-600 text-sm">{switchState.error}</p>
        )}
        {switchState.success && (
          <p className="text-green-600 text-sm">
            Organization switched successfully!
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function InviteForm({
  organizationId,
  onCancel,
}: {
  organizationId: string;
  onCancel: () => void;
}) {
  const [inviteState, inviteFormAction] = useActionState(
    inviteMemberAction,
    FORM_INITIAL_STATE
  );

  // Close form on success - Better Auth organization plugin integration
  useEffect(() => {
    if (inviteState.success) {
      const timer = setTimeout(() => {
        onCancel();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [inviteState.success, onCancel]);

  return (
    <div className="mt-3 border-t p-3">
      <h5 className="mb-2 font-medium">Invite Member</h5>
      <form action={inviteFormAction} className="space-y-2">
        <input type="hidden" name="organizationId" value={organizationId} />

        <div className="space-y-2">
          <Label htmlFor={`email-${organizationId}`}>Email</Label>
          <Input
            id={`email-${organizationId}`}
            name="email"
            type="email"
            placeholder="member@example.com"
            required
          />
          {inviteState.fieldErrors &&
            'email' in inviteState.fieldErrors &&
            inviteState.fieldErrors.email?.[0] && (
              <p className="mt-1 text-red-600 text-sm">
                {inviteState.fieldErrors.email[0]}
              </p>
            )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`role-${organizationId}`}>Role</Label>
          <select
            id={`role-${organizationId}`}
            name="role"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
          {inviteState.fieldErrors &&
            'role' in inviteState.fieldErrors &&
            inviteState.fieldErrors.role?.[0] && (
              <p className="mt-1 text-red-600 text-sm">
                {inviteState.fieldErrors.role[0]}
              </p>
            )}
        </div>

        <div className="flex gap-2">
          <Button type="submit" size="sm">
            Send Invite
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        {inviteState.error && (
          <p className="text-red-600 text-sm">{inviteState.error}</p>
        )}
        {inviteState.success && (
          <p className="text-green-600 text-sm">
            Invitation sent successfully!
          </p>
        )}
      </form>
    </div>
  );
}
