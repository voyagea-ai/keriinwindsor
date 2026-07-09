-- Keri In Windsor — orders table.
-- Run once in your Supabase project: SQL Editor → New query → paste → Run.

create table if not exists public.orders (
  id                       uuid primary key,
  order_number             text unique,
  type                     text not null check (type in ('order', 'notify')),
  status                   text not null default 'new',
  created_at               timestamptz not null default now(),
  name                     text not null,
  phone                    text not null,
  email                    text not null default '',
  address                  text not null default '',
  city                     text not null default '',
  postal_code              text not null default '',
  notes                    text not null default '',
  items                    jsonb not null default '[]'::jsonb,
  subtotal_cad             numeric(10,2) not null default 0,
  delivery_cad             numeric(10,2) not null default 0,
  total_cad                numeric(10,2) not null default 0,
  terms_accepted_at        timestamptz not null,
  marketing_opt_in         boolean not null default false,
  marketing_opt_in_at      timestamptz,
  payment_method           text not null default 'pay_on_confirmation',
  payment_status           text not null default 'pending',
  stripe_payment_intent_id text,
  source                   text not null default 'website'
);

-- Sequential numbering per type (KIW-0001…, KIW-N-0001…), assigned
-- atomically by a trigger so concurrent orders can never collide.
create sequence if not exists public.kiw_order_seq;
create sequence if not exists public.kiw_notify_seq;

create or replace function public.set_order_number()
returns trigger
language plpgsql
as $$
begin
  if new.order_number is null then
    if new.type = 'order' then
      new.order_number := 'KIW-' || lpad(nextval('public.kiw_order_seq')::text, 4, '0');
    else
      new.order_number := 'KIW-N-' || lpad(nextval('public.kiw_notify_seq')::text, 4, '0');
    end if;
  end if;
  return new;
end
$$;

drop trigger if exists trg_set_order_number on public.orders;
create trigger trg_set_order_number
  before insert on public.orders
  for each row execute function public.set_order_number();

-- Lock the table down: RLS on with NO policies means only the
-- service-role key (used by the website's server) can read or write.
-- The public anon key gets nothing.
alter table public.orders enable row level security;

create index if not exists idx_orders_type on public.orders (type);
create index if not exists idx_orders_created on public.orders (created_at desc);
