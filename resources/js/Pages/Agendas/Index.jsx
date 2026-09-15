import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    Check, 
    X,
    CalendarDays,
    CheckCircle2,
    XCircle
} from 'lucide-react';

function ErrorText({ message }) {
    if (!message) return null;
    return <p className="mt-1 text-xs text-rose-500">{message}</p>;
}

const defaultData = {
    title: '',
    date: '',
    time: '',
    location: '',
    is_active: true,
};

export default function AgendasIndex({ agendas, stats }) {
    const [editingItem, setEditingItem] = useState(null);

    const form = useForm(defaultData);

    const submit = (event) => {
        event.preventDefault();

        if (editingItem) {
            form.transform((data) => {
                const formData = { ...data, _method: 'put' };
                formData.is_active = formData.is_active ? 1 : 0;
                return formData;
            });
            form.post(route('agendas.update', editingItem.id), {
                preserveScroll: true,
                onSuccess: () => {
                    form.reset();
                    form.setData('is_active', true);
                    setEditingItem(null);
                },
            });
            return;
        }

        form.transform((data) => {
            const formData = { ...data };
            formData.is_active = formData.is_active ? 1 : 0;
            return formData;
        });
        form.post(route('agendas.store'), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                form.setData('is_active', true);
            },
        });
    };

    const editItem = (item) => {
        setEditingItem(item);
        form.setData({
            title: item.title,
            date: item.date,
            time: item.time || '',
            location: item.location || '',
            is_active: item.is_active,
        });
        form.clearErrors();
    };

    const deleteItem = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            router.delete(route('agendas.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const toggleActive = (item) => {
        router.put(route('agendas.update', item.id), {
            _method: 'put',
            title: item.title,
            date: item.date,
            time: item.time,
            location: item.location,
            is_active: !item.is_active ? 1 : 0,
        }, {
            preserveScroll: true,
        });
    };

    // Helper for formatting date
    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-neutral-800 dark:text-neutral-200">Kelola Agenda Kegiatan</h2>}
        >
            <Head title="Agenda Kegiatan - Admin" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-surface-base">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                    <CalendarDays size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                        Total Agenda
                                    </p>
                                    <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                                        {stats.total}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-surface-base">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                        Aktif
                                    </p>
                                    <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                                        {stats.active}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-surface-base">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-rose-50 p-3 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                                    <XCircle size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                        Tidak Aktif
                                    </p>
                                    <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                                        {stats.inactive}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Form Component */}
                        <div className="lg:col-span-1">
                            <form
                                onSubmit={submit}
                                className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-surface-base"
                            >
                                <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
                                    <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                                        {editingItem ? 'Edit Agenda' : 'Tambah Agenda Baru'}
                                    </h3>
                                </div>

                                <div className="flex flex-col gap-4 p-6">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Judul Kegiatan
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.title}
                                            onChange={(e) => form.setData('title', e.target.value)}
                                            className="w-full rounded-lg border-neutral-300 bg-white text-sm focus:border-accent-orange focus:ring-accent-orange dark:border-neutral-700 dark:bg-surface-muted dark:text-white"
                                            placeholder="Contoh: Rapat Evaluasi Bulanan"
                                            required
                                        />
                                        <ErrorText message={form.errors.title} />
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Tanggal
                                        </label>
                                        <input
                                            type="date"
                                            value={form.data.date}
                                            onChange={(e) => form.setData('date', e.target.value)}
                                            className="w-full rounded-lg border-neutral-300 bg-white text-sm focus:border-accent-orange focus:ring-accent-orange dark:border-neutral-700 dark:bg-surface-muted dark:text-white"
                                            required
                                        />
                                        <ErrorText message={form.errors.date} />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Waktu (Opsional)
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.time}
                                            onChange={(e) => form.setData('time', e.target.value)}
                                            className="w-full rounded-lg border-neutral-300 bg-white text-sm focus:border-accent-orange focus:ring-accent-orange dark:border-neutral-700 dark:bg-surface-muted dark:text-white"
                                            placeholder="Contoh: 15:00 WIB"
                                        />
                                        <ErrorText message={form.errors.time} />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Lokasi (Opsional)
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.location}
                                            onChange={(e) => form.setData('location', e.target.value)}
                                            className="w-full rounded-lg border-neutral-300 bg-white text-sm focus:border-accent-orange focus:ring-accent-orange dark:border-neutral-700 dark:bg-surface-muted dark:text-white"
                                            placeholder="Contoh: Sekretariat UKM"
                                        />
                                        <ErrorText message={form.errors.location} />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={form.data.is_active}
                                            onChange={(e) => form.setData('is_active', e.target.checked)}
                                            className="rounded border-neutral-300 text-accent-orange focus:ring-accent-orange dark:border-neutral-700 dark:bg-surface-muted dark:checked:bg-accent-orange"
                                        />
                                        <label htmlFor="is_active" className="text-sm text-neutral-700 dark:text-neutral-300">
                                            Aktif / Tampilkan di Kalender?
                                        </label>
                                        <ErrorText message={form.errors.is_active} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 border-t border-neutral-200 px-6 py-4 dark:border-neutral-800">
                                    {editingItem && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingItem(null);
                                                form.reset();
                                                form.clearErrors();
                                            }}
                                            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                                        >
                                            Batal
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="inline-flex items-center gap-2 rounded-lg bg-accent-orange px-4 py-2 text-sm font-medium text-white hover:bg-accent-orange/90 disabled:opacity-50"
                                    >
                                        {form.processing ? (
                                            'Menyimpan...'
                                        ) : (
                                            <>
                                                <Plus size={16} />
                                                {editingItem ? 'Simpan Perubahan' : 'Tambah Agenda'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Data List */}
                        <div className="lg:col-span-2">
                            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-surface-base overflow-hidden">
                                <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
                                    <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                                        Daftar Agenda
                                    </h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-400">
                                        <thead className="bg-neutral-50 text-neutral-900 dark:bg-surface-muted dark:text-neutral-100">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Tanggal</th>
                                                <th className="px-6 py-4 font-medium">Kegiatan</th>
                                                <th className="px-6 py-4 font-medium text-center">Status</th>
                                                <th className="px-6 py-4 font-medium text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                            {agendas.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-8 text-center text-neutral-500">
                                                        Belum ada data agenda.
                                                    </td>
                                                </tr>
                                            ) : (
                                                agendas.map((item) => (
                                                    <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-surface-muted/50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="font-medium text-neutral-900 dark:text-neutral-100">
                                                                {formatDate(item.date)}
                                                            </div>
                                                            <div className="text-xs text-neutral-500">
                                                                {item.time || '-'}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                                                                {item.title}
                                                            </div>
                                                            <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                                                                {item.location || '-'}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <button
                                                                onClick={() => toggleActive(item)}
                                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                                                                    item.is_active
                                                                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400'
                                                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400'
                                                                }`}
                                                            >
                                                                {item.is_active ? (
                                                                    <><Check size={14} /> Aktif</>
                                                                ) : (
                                                                    <><X size={14} /> Tdk Aktif</>
                                                                )}
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button
                                                                    onClick={() => editItem(item)}
                                                                    className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-accent-orange dark:hover:bg-neutral-800"
                                                                    title="Edit"
                                                                >
                                                                    <Pencil size={18} />
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteItem(item.id)}
                                                                    className="rounded-lg p-2 text-neutral-400 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-500/10"
                                                                    title="Hapus"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
